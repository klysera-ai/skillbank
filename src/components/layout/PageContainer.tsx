type PageContainerProps = Readonly<{
  children: React.ReactNode;
}>;

export function PageContainer({ children }: PageContainerProps): React.ReactElement {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {children}
    </div>
  );
}
