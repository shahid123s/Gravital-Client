const Spinner = ({bgColor, fill, position}) => {
    const color = bgColor === 'grey'? 'bg-[#757575]' : 'bg-transparent' ;
    console.log(color)
    return (
        <div className={`${position? position: ''} flex items-center w-fill justify-center ${fill? 'h-fill': 'h-screen'}  ${color} `}>
            <div className="w-12 h-12 border-4 bg-inherit border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;