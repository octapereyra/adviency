import { FormEvent, useEffect, useState } from 'react';
import './App.css';

const regalos = () => {
  const gifts = localStorage.getItem('gifts');
  if (gifts) {
    return JSON.parse(gifts) as string[];
  } else {
    return [];
  }
};

function App() {
  const [gifts, setGifts] = useState(regalos);

  useEffect(() => {
    localStorage.setItem('gifts', JSON.stringify(gifts));
  }, [gifts]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fields = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );
    if (fields.query === '') return;
    if (Number.parseInt(fields.giftCount.toString()) > 1) {
      const giftName = `${fields.query} x${fields.giftCount.toString()}`;
      setGifts([...gifts, giftName]);
    } else {
      setGifts([...gifts, fields.query as string]);
    }
  };

  const handleDelete = (giftSelected: string) => () => {
    setGifts(gifts.filter((gift) => gift !== giftSelected));
  };

  const deleteAll = () => {
    setGifts([]);
  };

  return (
    <div className="flex flex-row justify-center h-screen">
      <div className="flex flex-col justify-center items-center gap-2 w-[450px]">
        <main className=" bg-red-200 p-10 rounded-md">
          <h1 className=" font-bold text-5xl">Regalos:</h1>
          <form className="flex justify-between p-2" onSubmit={handleSubmit}>
            <input
              type="text"
              name="query"
              className="h-9 w-2/3 border-solid border-black border rounded"
            ></input>
            <input
              type="number"
              name="giftCount"
              min={1}
              className="h-9 w-1/12 border-solid border-black border rounded"
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
