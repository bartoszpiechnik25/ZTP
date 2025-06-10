import backgroundImage from "@/assets/images/background-documents.jpg";

const HomeBackground = () => {
  return (
    <div className="flex flex-2 relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary"></div>
      <img
        src={backgroundImage}
        alt="background-documents"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
      />
    </div>
  );
};

export default HomeBackground;
