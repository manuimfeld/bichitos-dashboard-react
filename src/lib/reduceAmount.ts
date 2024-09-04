export default function reduceAmount(arr) {
  const initialAmount = 0;

  const sumWithInitial = arr.reduce(
    (total, item) => total + parseFloat(item.amount),
    initialAmount
  );
  return sumWithInitial;
}
