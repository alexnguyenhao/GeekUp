import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import AlbumsPage from "./pages/AlbumsPage";
import UsersPage from "./pages/UsersPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import UserDetailPage from "./pages/UserDetailPage";
import "./index.css";
import Header from "./components/Header";

const { Content } = Layout;
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Header />
          <Layout>
            <Sidebar />
            <Content className="p-6 bg-gray-80" style={{ minHeight: "100vh" }}>
              <Routes>
                <Route path="/" element={<AlbumsPage />} />
                <Route path="/albums" element={<AlbumsPage />} />
                <Route path="/albums/:id" element={<AlbumDetailPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:id" element={<UserDetailPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
