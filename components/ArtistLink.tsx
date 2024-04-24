export default function ArtistLink() {
  return (
    <div className="h-[100px] w-[109px]  flex flex-col gap-y-[16px] text-white text-[10px]  uppercase font-helv cursor-none">
      <div className="text-left tracking-[0.08em]">Johanna Hobel for WILD</div>
      <div className="text-right tracking-[0.08em]">DEC 2019</div>
      <button
        className="group text-[#202020] tracking-[0.08em] bg-white  w-full py-[8px] rounded-full font-helvBold text-center cursor-none uppercase hover:text-white duration-300 hover:bg-transparent
"
      >
        <div className="my-auto"> Have a Look</div>
      </button>
    </div>
  );
}
