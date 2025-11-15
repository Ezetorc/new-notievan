import { useState, useMemo, useEffect } from "react"
import Cropper, { type Point, type Area } from "react-easy-crop"
import { useSession } from "../hooks/use-session.hook"
import { getCroppedImage } from "../utilities/get-cropped-image.utility"
import { Slider } from "@mui/material"
import { ErrorMessage } from "./ErrorMessage"
import { ActionButton } from "./ActionButton"

export function ImageCropper(props: {
  image: File
  onComplete: (file: File) => void
}) {
  const { user } = useSession()
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [error, setError] = useState<string>("")
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>()

  const imageSrc = useMemo(
    () => URL.createObjectURL(props.image),
    [props.image]
  )

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    console.log(croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleSave = async () => {
    try {
      if (!croppedAreaPixels) return

      const file = await getCroppedImage(props.image, croppedAreaPixels, user?.id)

      if (file) {
        props.onComplete(file)
      }
    } catch {
      setError("Error al procesar la imagen")
    }
  }

  return (
    <div className='flex flex-col gap-y-5 w-full h-[70vh]'>
      <div className='relative w-full h-full'>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className='flex-1'>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby='Zoom'
          onChange={(_, zoom) => setZoom(Number(zoom))}
        />
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ActionButton onClick={handleSave} className="bg-brand-orange text-2xl text-white font-bold py-3">
        Guardar
      </ActionButton>
    </div>
  )
}