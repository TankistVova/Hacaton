import React, { useRef, useEffect, useState } from 'react';
import { Canvas, Rect, Circle, Line } from 'fabric';
import Parse from 'parse';
import '../Style/HomeStyle.css';

// Настройка Parse
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [offices, setOffices] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Загрузка списка офисов
  const loadOffices = async () => {
    try {
      const Office = Parse.Object.extend('Office');
      const query = new Parse.Query(Office);
      const results = await query.find();
      setOffices(results.map((office) => ({
        id: office.id,
        preview: office.get('preview'),
      })));
    } catch (error) {
      console.error('Error loading offices:', error);
    }
  };

  // Загрузка списка сотрудников
  const loadEmployees = async () => {
    try {
      const Employee = Parse.Object.extend('Employee');
      const query = new Parse.Query(Employee);
      const results = await query.find();
      setEmployees(results);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  useEffect(() => {
    const initCanvas = new Canvas(canvasRef.current);
    setCanvas(initCanvas);
    loadOffices(); // Загружаем список офисов при монтировании компонента
    loadEmployees(); // Загружаем сотрудников
    return () => {
      initCanvas.dispose(); // Удаление холста при размонтировании компонента
    };
  }, []);

  const addObjectToCanvas = (type) => {
    if (!canvas) return;
    let object;

    switch (type) {
      case 'desk':
        object = new Rect({ left: 100, top: 100, fill: 'brown', width: 100, height: 50 });
        break;
      case 'monitor':
        object = new Rect({ left: 150, top: 50, fill: 'black', width: 50, height: 30 });
        break;
      case 'pc':
        object = new Rect({ left: 320, top: 100, fill: 'gray', width: 25, height: 50 });
        break;
      case 'keyboard':
        object = new Rect({ left: 150, top: 170, fill: 'darkgray', width: 60, height: 10 });
        break;
      case 'mouse':
        object = new Circle({ left: 280, top: 170, fill: 'black', radius: 5 });
        break;
      case 'chair':
        object = new Rect({ left: 100, top: 220, fill: 'blue', width: 25, height: 25 });
        break;
      case 'pouf':
        object = new Circle({ left: 200, top: 220, fill: 'red', radius: 12.5 });
        break;
      case 'wall':
        object = new Line([50, 50, 300, 50], { stroke: 'black', strokeWidth: 2.5 });
        break;
      case 'door':
        object = new Rect({ left: 350, top: 50, fill: 'brown', width: 25, height: 50 });
        break;
      case 'flowers':
        object = new Circle({ left: 400, top: 100, fill: 'green', radius: 15 });
        break;
      case 'wardrobe':
        object = new Rect({ left: 450, top: 100, fill: 'brown', width: 50, height: 100 });
        break;
      case 'watercooler':
        object = new Rect({ left: 500, top: 100, fill: 'blue', width: 20, height: 50 });
        break;
      case 'fridge':
        object = new Rect({ left: 550, top: 100, fill: 'white', width: 30, height: 60 });
        break;
      case 'coffeemachine':
        object = new Rect({ left: 600, top: 100, fill: 'black', width: 20, height: 30 });
        break;
      case 'tv':
        object = new Rect({ left: 650, top: 50, fill: 'black', width: 60, height: 40 });
        break;
      default:
        return;
    }
    canvas.add(object);
  };

  const removeSelectedObject = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
      }
    }
  };

  // Функция сохранения данных кабинета
  const saveOffice = async (officeData) => {
    try {
      const Office = Parse.Object.extend('Office');
      const office = new Office();
      office.set('data', officeData);
      await office.save();
      loadOffices(); // Обновляем список офисов после сохранения
    } catch (error) {
      console.error('Error saving office:', error);
    }
  };

  // Функция генерации миниатюры для отображения объектов
  const generateThumbnail = async (officeData) => {
    const tempCanvas = new Canvas();
    await tempCanvas.loadFromJSON(officeData);

    // Масштабируем канвас для миниатюры
    tempCanvas.setWidth(200);
    tempCanvas.setHeight(150);
    tempCanvas.setZoom(0.2);

    // Генерируем Data URL для миниатюры
    const dataURL = tempCanvas.toDataURL({ format: 'png' });
    return dataURL;
  };

  // Функция загрузки данных кабинета по ID
  const loadOffice = async (officeId) => {
    try {
      const Office = Parse.Object.extend('Office');
      const query = new Parse.Query(Office);
      const office = await query.get(officeId);
      return office.get('data');
    } catch (error) {
      console.error('Error loading office:', error);
    }
  };

  const handleSave = async () => {
    const json = canvas.toJSON();
    await saveOffice(json);
  };

  const handleLoad = async (officeId) => {
    const officeData = await loadOffice(officeId);
    canvas.loadFromJSON(officeData);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', padding: '10px', borderRight: '1px solid #ccc' }}>
        <h3>Objects</h3>
        {/* Обновленные кнопки с названиями и превью объектов */}
        <button className="preview-button" onClick={() => addObjectToCanvas('desk')}>
          <div className="preview" style={{ backgroundColor: 'brown', width: '40px', height: '20px' }}></div>
          Desk
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('monitor')}>
          <div className="preview" style={{ backgroundColor: 'black', width: '40px', height: '24px' }}></div>
          Monitor
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('pc')}>
          <div className="preview" style={{ backgroundColor: 'gray', width: '20px', height: '40px' }}></div>
          PC
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('keyboard')}>
          <div className="preview" style={{ backgroundColor: 'darkgray', width: '48px', height: '8px' }}></div>
          Keyboard
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('mouse')}>
          <div className="preview" style={{ backgroundColor: 'black', borderRadius: '50%', width: '20px', height: '20px' }}></div>
          Mouse
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('chair')}>
          <div className="preview" style={{ backgroundColor: 'blue', width: '20px', height: '20px' }}></div>
          Chair
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('pouf')}>
          <div className="preview" style={{ backgroundColor: 'red', borderRadius: '50%', width: '20px', height: '20px' }}></div>
          Pouf
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('wall')}>
          <div className="preview" style={{ backgroundColor: 'black', width: '40px', height: '4px' }}></div>
          Wall
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('door')}>
          <div className="preview" style={{ backgroundColor: 'brown', width: '20px', height: '40px' }}></div>
          Door
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('flowers')}>
          <div className="preview" style={{ backgroundColor: 'green', borderRadius: '50%', width: '30px', height: '30px' }}></div>
          Flowers
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('wardrobe')}>
          <div className="preview" style={{ backgroundColor: 'brown', width: '40px', height: '80px' }}></div>
          Wardrobe
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('watercooler')}>
          <div className="preview" style={{ backgroundColor: 'blue', width: '15px', height: '30px' }}></div>
          Watercooler
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('fridge')}>
          <div className="preview" style={{ backgroundColor: 'white', width: '25px', height: '50px' }}></div>
          Fridge
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('coffeemachine')}>
          <div className="preview" style={{ backgroundColor: 'black', width: '15px', height: '25px' }}></div>
          Coffeemachine
        </button>
        <button className="preview-button" onClick={() => addObjectToCanvas('tv')}>
          <div className="preview" style={{ backgroundColor: 'black', width: '50px', height: '30px' }}></div>
          TV
        </button>
        <button className="preview-button" onClick={removeSelectedObject}>
          Remove Selected Object
        </button>
      </div>

      <div style={{ flexGrow: 1, padding: '10px' }}>
        <canvas ref={canvasRef} width={800} height={600}></canvas>
        <div>
          <button onClick={handleSave}>Save Office</button>
          <button onClick={() => handleLoad(offices[0]?.id)}>Load Office</button>
        </div>
      </div>
    </div>
  );
};

export default App;
