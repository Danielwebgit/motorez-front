import Header from "@/components/Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;