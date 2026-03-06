interface IErorrMassegaProps {
  msg: string;
}

function ErorrMassega({ msg }: IErorrMassegaProps) {
  return msg ? (
    <span className="block text-red-700 text-sm font-semibold">{msg}</span>
  ) : null;
}

export default ErorrMassega;
