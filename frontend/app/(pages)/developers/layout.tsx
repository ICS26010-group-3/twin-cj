import s from "./page.module.scss";
export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={s.main}>
    <div className={s.background}></div>
    {children}
    </div>;
}
