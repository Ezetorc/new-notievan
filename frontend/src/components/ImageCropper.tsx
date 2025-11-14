import { useState, useMemo, useEffect } from "react"
import Cropper, { type Point, type Area } from "react-easy-crop"
import { useSession } from "../hooks/use-session.hook"
import { getCroppedImage } from "../utilities/get-cropped-image.utility"
import { Slider } from "@mui/material"

export function ImageCropper(props: {
  image: File
  onComplete: (file: File) => void
}) {
  const { user } = useSession()
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const imageSrc = useMemo(
    () => URL.createObjectURL(props.image),
    [props.image]
  )

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  const handleCropComplete = async (_: Area, croppedArea: Area) => {
    const file = await getCroppedImage(props.image, croppedArea, user?.id)

    if (file) {
      props.onComplete(file)
    }
  }

  return (
    <div className='relative w-full h-[500px]'>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onCropComplete={handleCropComplete}
        onZoomChange={setZoom}
      />

      <Slider
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        aria-labelledby='Zoom'
        onChange={(_, zoom) => setZoom(Number(zoom))}
      />
    </div>
  )
}