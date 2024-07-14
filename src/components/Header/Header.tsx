type HeaderProps = {
  activeIndex: number;
  setActiveIndex: (param: number) => void;
};

const Header: React.FC<HeaderProps> = ({ activeIndex, setActiveIndex }) => {
  console.log(activeIndex);
  return (
    <header className="lg:px-8 lg:py-6 p-4">
      <h1 className="text-4xl font-medium text-center mb-3">Let's Quizz.</h1>
      <p className="text-center mb-3 text-lg font-medium">{activeIndex+1}/5</p>
      <div className="grid grid-cols-5 md:gap-3 gap-2 max-w-[600px] mx-auto">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <input
                id={`id-${index}`}
                className="peer"
                type="radio"
                hidden
                name="tab"
                checked={activeIndex === index}
                onChange={() => setActiveIndex(index)}
              />
              <label
                htmlFor={`id-${index}`}
                className={`peer-checked:bg-blue-500 flex w-full h-3  bg-blue-100 rounded-lg cursor-pointer ${
                  activeIndex === index ? "active" : ""
                }`}
              ></label>
            </div>
          ))}
      </div>
    </header>
  );
};

export default Header;
