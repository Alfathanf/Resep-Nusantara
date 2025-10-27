export default function RecipeDetailPage({ recipe, onBack }) {
  if (!recipe) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button 
        onClick={onBack}
        className="text-blue-600 hover:underline mb-4"
      >
        Kembali
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img 
          src={recipe.image_url} 
          alt={recipe.name} 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">{recipe.name}</h1>

          <h2 className="text-lg font-semibold text-blue-700 mb-2">Bahan-bahan:</h2>
          <ul className="list-disc list-inside text-slate-700 mb-6">
            {recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold text-blue-700 mb-2">Langkah-langkah:</h2>
          <ol className="list-decimal list-inside text-slate-700 space-y-2">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
