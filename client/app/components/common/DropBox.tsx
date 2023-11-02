// components/DropBox.js
import {useDropzone} from 'react-dropzone';
import Image from 'next/image';
import {useState, useCallback} from 'react';

type Props = {
    onUpload: (file: File) => void;
};

const DropBox = ({onUpload}: Props) => {
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length) {
                onUpload(acceptedFiles[0]);
                const objectUrl = URL.createObjectURL(acceptedFiles[0]);
                setImagesPreview([objectUrl]);
            }
        },
        [onUpload]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*': []},
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            style={{
                border: '2px dashed #D1D5DB',
                width: '100%',
                height: '200px',
                position: 'relative',
                borderRadius: '6px',
                padding: '0.625rem 0.75rem'
            }}
        >
            <input id='fileInput' {...getInputProps()} />
            {isDragActive ? (
                <p
                    style={{transform: 'translate(-50%, -50%)'}}
                    className={
                        'absolute top-[50%] left-[50%] text-sm text-[#4B5563] text-center font-medium'
                    }
                >
                    Перетягніть сюди своє зображення...
                </p>
            ) : imagesPreview.length ? (
                imagesPreview.map((image, index) => (
                    <Image
                        width={130}
                        height={155}
                        key={index}
                        src={image}
                        alt={`Preview ${index}`}
                        className='object-cover mr-2'
                    />
                ))
            ) : (
                <>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <Image src='../dragDrop.svg' width={48} height={48} alt='Logo QN' />
                        <p className={'text-sm text-[#4B5563] text-center font-medium'}>
                            Завантажте зображення вашого поста
                        </p>
                        <p className={'text-xs text-[#6B7280] font-normal'}>PNG, JPG до 1 MB</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default DropBox;
