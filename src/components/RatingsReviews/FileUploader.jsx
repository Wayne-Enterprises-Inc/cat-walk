import React, {useRef} from 'react'

const FileUploader = ({onFileSelectSuccess}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
      const file = e.target.files[0];
      onFileSelectSuccess(file)
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput}/>
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"/>
        </div>
    )
}

export default FileUploader;