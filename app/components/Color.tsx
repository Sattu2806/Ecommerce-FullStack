import React, { useState, useEffect } from 'react';
import { GrAdd } from "react-icons/gr";
import { SketchPicker } from 'react-color';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  Color: string;
}

const Color: React.FC<Props> = ({ setFormData, Color }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [sketchColor, setSketchColor] = useState('#fff'); // State for SketchPicker

  const colorArray: string[] = Color.split(',');
  const [selectedColors, setSelectColors] = useState<string[]>(colorArray);

  const handleColorButtonClick = () => {
    setSelectColors((prevSelectedColors) => [...prevSelectedColors, sketchColor]);
    setOpen(false);
  }

  useEffect(() => {
    const handleSelectedColors = () => {
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        color: selectedColors.join(",")
      }));
    }
    handleSelectedColors();
  }, [selectedColors]);

  const handleDeleteColor = (indexToDelete: number) => {
    setSelectColors((prevSelectedColors) => {
      const updateColors = [...prevSelectedColors];
      updateColors.splice(indexToDelete, 1);
      return updateColors;
    });
  }

  const handleChangeComplete = (color:any) => {
    setSketchColor(color.hex); // Update SketchPicker color
  }

  return (
    <div>
      <div className='flex items-center justify-between mt-3'>
        <button className='block border-[1px] rounded-lg px-3 text-[14px]'
          onClick={() => setOpen(!open)}
        >
          Choose Color
        </button>
        {open && (
          <SketchPicker color={sketchColor} onChangeComplete={handleChangeComplete} />
        )}
        <button className='flex items-center space-x-1 border-[1px] rounded-lg p-1 px-3 text-[14px]'
          onClick={handleColorButtonClick}
        >
          Add<GrAdd className="ml-1" size={16} />
        </button>
      </div>
      <div className='mt-5'>
        {selectedColors.map((selectedColor, index) => (
          <div key={index} className='flex items-center space-x-4 mb-2'>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: '100%',
                backgroundColor: selectedColor,
                display: "inline-block"
              }}
            >
            </div>
            <span className='border-[1px] rounded-lg p-1 px-3 text-[14px]'>{selectedColor}</span>
            <button className='border-[1px] rounded-lg p-1 px-3 text-[14px]' onClick={() => handleDeleteColor(index)}>delete</button>
          </div>
        ))}
      </div>

      {/* Include the SketchPicker component with the updated color state */}
    </div>
  )
}

export default Color;
