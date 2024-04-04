import { FormEvent, useEffect, useState } from 'react';
import { Gift } from './Gift';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function Gifts() {
  const regalos = () => {
    const gifts = localStorage.getItem('gifts');
    if (gifts) {
      return JSON.parse(gifts) as Gift[];
    } else {
      return [];
    }
  };

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
      setGifts([
        ...gifts,
        {
          id: crypto.randomUUID(),
          description: giftName,
          imgUrl: fields.imageUrl.toString(),
        },
      ]);
    } else {
      setGifts([
        ...gifts,
        {
          id: crypto.randomUUID(),
          description: fields.query.toString(),
          imgUrl: fields.imageUrl.toString(),
        },
      ]);
    }
  };

  const handleDelete = (giftSelected: string) => () => {
    setGifts(gifts.filter((gift) => gift.id !== giftSelected));
  };

  const deleteAll = () => {
    setGifts([]);
  };

  return (
    <main className="bg-red-200 w-[600px] p-10 rounded-xl shadow-lg flex flex-col items-center">
      <h1 className="font-bold text-5xl mb-2">Regalos:</h1>
      <Dialog>
        <DialogTrigger asChild className="mt-2 h-8">
          <button className="bg-red-600 text-white rounded-lg w-1/3 hover:bg-red-700 mb-2">
            Agregar regalos
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar regalo</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
            <input
              type="text"
              name="query"
              placeholder="Regalo..."
              className="h-9 w-full border-solid border-black border rounded"
            ></input>
            <input
              type="text"
              name="imageUrl"
              placeholder="Link de la imagen..."
              className="h-9 w-full border-solid border-black border rounded"
            ></input>
            <input
              type="number"
              name="giftCount"
              placeholder="Cantidad..."
              min={1}
              className="h-9 w-full border-solid border-black border rounded"
            ></input>
            <button
              type="submit"
              className=" bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
            >
              Agregar
            </button>
          </form>
        </DialogContent>
      </Dialog>
      {gifts.length === 0 && (
        <span className="w-full text-center">No hay regalos</span>
      )}
      <ul className="w-full">
        {gifts.map((gift) => (
          <li key={gift.id} className="flex justify-between items-center p-1">
            <img src={gift.imgUrl} className=" w-auto h-12"></img>
            <span className=" text-left">{gift.description}</span>
            <button
              className="bg-red-600 text-white rounded-full w-6 h-6 hover:bg-red-700"
              onClick={handleDelete(gift.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button
        className="w-1/3 h-8 mt-2 bg-red-600 text-white hover:bg-red-700 rounded-lg"
        onClick={deleteAll}
      >
        Borrar todo
      </button>
    </main>
  );
}
