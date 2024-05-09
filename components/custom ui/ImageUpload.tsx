import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { Button } from '../ui/button';

interface ImageUploadProps {
    value: string[],
    onChange: (value: string) => void,
    onRemove: (value: string) => void
}


const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value }) => {

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }
    return (
        <div>
            <div className='relative'>
            <div className='mb-4 flex flex-wrap items-center gap-4'>
                {value.map((url) => (
                    <div>
                        <Image src={url}
                    
                    alt="collections"
                    className="rounded-lg"
                    width={200}
                    height={200}/>
                    </div>
                    
                ))}


            </div>
            
            </div>
            <CldUploadWidget uploadPreset="u5nuy5ql" onUpload={onUpload}>
                {({ open }) => {
                    return (
                        <button onClick={() => open()} className='text-black bg-gray-400 rounded m-5 py-2'>
                            Upload Image
                        </button>
                    );
                }}
            </CldUploadWidget>

        </div>
    )
}

export default ImageUpload