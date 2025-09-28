import StyledComponentsRegistry from '@/lib/registry'

export const metadata = {
  title: 'Ecommerce',
  description: 'Encontre os melhores produtos aqui!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}