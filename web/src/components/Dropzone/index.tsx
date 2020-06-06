import React, { useCallback, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';

import PropTypes from 'prop-types';

import './styles.css';

interface IProps {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<IProps> = ({ onFileUploaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const fileUrl = URL.createObjectURL(file);

            setSelectedFileUrl(fileUrl);
            onFileUploaded(file);
        },
        [onFileUploaded],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />

            {selectedFileUrl ? (
                <img src={selectedFileUrl} alt="Point thumbnail" />
            ) : isDragActive ? (
                <p>Solte a imagem aqui...</p>
            ) : (
                <p>
                    <FiUpload />
                    Imagem do estabelecimento
                </p>
            )}
        </div>
    );
};

Dropzone.propTypes = {
    onFileUploaded: PropTypes.func.isRequired,
};

export default Dropzone;
