import React from 'react'

export interface Props {
  text: string
}

export const App: React.FC<Props> = ({text}) => (
  <div>
    <h1>hello {text}</h1>
  </div>
)
