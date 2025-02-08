const RootLayout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <html lang="ES"> 
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout  