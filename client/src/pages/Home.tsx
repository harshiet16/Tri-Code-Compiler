export default function Home() {
  return (
    <div className="w-full h-[calc(100dvh-60px)] text-foreground flex justify-center items-center flex-col gap-1 md:gap-3 bg-gradient-to-br from-background via-background to-primary/20 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-pulse"></div>
      
      <h1 className="text-3xl sm:text-7xl font-extrabold text-center animate-float drop-shadow-2xl">
        <span className="text-primary">TriCode</span> Compiler
      </h1>
      <p className="text-muted-foreground text-center p-3 max-w-[600px] text-lg">
        The ultimate <span className="text-secondary font-semibold">Web Development</span> playground. 
        Write HTML, CSS, and JS with instant previews and secure sharing.
      </p>
      <div className="flex gap-4 mt-4">
        <div className="w-24 h-1 bg-primary rounded-full"></div>
        <div className="w-12 h-1 bg-secondary rounded-full"></div>
        <div className="w-6 h-1 bg-accent rounded-full"></div>
      </div>
    </div>
  );
}
