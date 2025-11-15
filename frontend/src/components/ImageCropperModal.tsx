import { ImageCropper } from "./ImageCropper";
import { Modal } from "./Modal";

export function ImageCropperModal({
  image,
  onComplete,
}: {
  image: File;
  onComplete: (file: File) => void;
}) {
  return (
    <Modal>
      <div className='p-6 mobile:w-[90vw] space-y-5 tablet:w-[40vw] bg-brand-blue rounded-2xl'>
        <ImageCropper
          image={image}
          onComplete={(croppedImage) => onComplete(croppedImage)}
        />
      </div>
    </Modal>
  )
}