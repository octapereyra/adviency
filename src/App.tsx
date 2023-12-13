import { FormEvent, useState } from 'react';
import './App.css';

const regalos = ['Medias', 'Caramelos', 'Vitel Tone'];

function App() {
  const [gifts, setGifts] = useState(regalos);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fields = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    setGifts([...gifts, fields.query as string]);
  };

  const handleDelete = (giftSelected: string) => () => {
    setGifts(gifts.filter((gift) => gift !== giftSelected));
  };

  const deleteAll = () => {
    setGifts([]);
  };

  return (
    <div className="flex flex-row justify-center h-screen">
      <div className="flex flex-col justify-center items-center gap-2">
        <main className=" bg-red-200 p-10 rounded-md">
          <h1 className=" font-bold text-5xl">Regalos:</h1>
          <form className="flex justify-between p-2" onSubmit={handleSubmit}>
            <input
              type="text"
              name="query"
              className="h-9 w-2/3 border-solid border-black border rounded"
            ></input>
            <button
              type="submit"
              className=" bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
            >
              Agregar
            </button>
          </form>
          {gifts.length === 0 && (
            <span className="w-full text-center">No viene papa noel</span>
          )}
          <ul className="">
            {gifts.map((gift) => (
              <li key={gift} className="flex justify-between p-1">
                {gift}
                <button
                  className="bg-red-600 text-white rounded-md w-4 hover:bg-red-700"
                  onClick={handleDelete(gift)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <button
            className="w-full h-8 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={deleteAll}
          >
            Borrar todo
          </button>
        </main>
      </div>
    </div>
  );
}

export default App;
