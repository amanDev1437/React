export function Stats({ items }) {
    if (!items.length) {
      return (
        <p className="stats">
          <em>Start adding some items to your packing list</em>
        </p>
      );
    }
  
    const totalItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const percentage = Math.round((packedItems / totalItems) * 100);
  
    return (
      <footer className="stats">
        {percentage === 100 ? (
          "You got everything! Ready to go"
        ) : (
          <em>
            You have {totalItems} items on your list, and you already packed{" "}
            {packedItems} ({percentage}%)
          </em>
        )}
      </footer>
    );
  }