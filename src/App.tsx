import { TipTap } from "./components/tiptap";

function App() {
  return (
    <div className="bg-zinc-50 grid place-items-center h-screen w-screen">
      <TipTap
        limitCharacters={1000}
        placeholder="Adicione a descrição da sua ordem de serviço aqui..."
      />
    </div>
  );
}

export default App;
