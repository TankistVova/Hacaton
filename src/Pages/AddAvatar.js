import React, { useState } from 'react';
import Parse from 'parse';
import '../Style/AddAvatarStyle.css'; // Импорт файла CSS

const AddAvatar = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-zA-Z0-9.]/g, '_');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (file) {
      const currentUser = Parse.User.current();
      const sanitizedFileName = sanitizeFileName(file.name);
      const parseFile = new Parse.File(sanitizedFileName, file);
      currentUser.set('avatar', parseFile);
      try {
        await currentUser.save();
        alert('Аватар успешно обновлен!');
      } catch (error) {
        alert(`Ошибка: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-avatar-container">
      <form onSubmit={handleUpload} className="add-avatar-form">
        <h2>Добавить аватар</h2>
        <input type="file" onChange={handleFileChange} required />
        {preview && <img src={preview} alt="Предварительный просмотр" className="preview" />}
        <button type="submit">Загрузить</button>
      </form>
    </div>
  );
};

export default AddAvatar;