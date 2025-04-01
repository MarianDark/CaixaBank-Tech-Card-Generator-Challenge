import React from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import CardGenerator from "./components/CardGenerator";
import CardList from "./components/CardList";

const App = () => {
  return (
    <Layout>
      <Header />
      <CardGenerator />
      <CardList />
    </Layout>
  );
};

export default App;
