import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import formSchema from "../data/schema";

const DynamicForm = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [fields, setFields] = useState(schema);

  const handleChange = (path, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      let temp = newData;
      path.slice(0, -1).forEach((key) => {
        temp[key] = temp[key] || {};
        temp = temp[key];
      });
      temp[path[path.length - 1]] = value;
      return { ...newData };
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedFields = [...fields];
    const [movedItem] = updatedFields.splice(result.source.index, 1);
    updatedFields.splice(result.destination.index, 0, movedItem);
    setFields(updatedFields);
  };

  const renderField = (field, path = []) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            type={field.type}
            className="border p-2 rounded w-full"
            placeholder={field.label}
            required={field.required}
            onChange={(e) =>
              handleChange([...path, field.name], e.target.value)
            }
          />
        );
      case "select":
        return (
          <select
            className="border p-2 rounded w-full"
            onChange={(e) =>
              handleChange([...path, field.name], e.target.value)
            }
          >
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) =>
              handleChange([...path, field.name], e.target.checked)
            }
          />
        );
      case "section":
        return (
          <div className="border p-4 rounded mb-4">
            <h3 className="text-lg font-bold mb-2">{field.label}</h3>
            {field.fields.map((subField) => (
              <div key={subField.name} className="mb-2">
                {renderField(subField, [...path, field.name])}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4 ">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="formFields">
          {(provided) => (
            <form
              ref={provided.innerRef}
              {...provided.droppableProps}
              onSubmit={(e) => {
                e.preventDefault();
                setSubmittedData((prev) => [...prev, formData]);
                setFormData({});
              }}
              className="w-[60%] p-4 max-w-lg mx-auto"
            >
              {fields.map((field, index) => (
                <Draggable
                  key={field.name}
                  draggableId={field.name}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 p-2 bg-white shadow rounded cursor-move"
                    >
                      {renderField(field)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Submit
              </button>
            </form>
          )}
        </Droppable>
      </DragDropContext>
      <div className="p-4 bg-white border rounded shadow-md w-1/2">
        <h3 className="text-lg font-bold mb-2">Submitted JSONs</h3>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(submittedData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default DynamicForm;
