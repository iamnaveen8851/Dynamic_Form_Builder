import DynamicForm from "./components/DynamicForm";
import formSchema from "./data/schema";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-[60vw] m-auto">
      <div className="bg-white p-6 rounded shadow-md w-[100%]">
        <h2 className="text-xl font-bold mb-4">Dynamic Form</h2>
        <DynamicForm schema={formSchema}/>
      </div>
    </div>
  );
}
