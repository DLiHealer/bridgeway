import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout.jsx';
import { Skeleton } from './components/ui';

const Home = lazy(() => import('./pages/Home.jsx'));
const MapPage = lazy(() => import('./pages/MapPage.jsx'));
const SubmitPage = lazy(() => import('./pages/SubmitPage.jsx'));
const IdeasPage = lazy(() => import('./pages/IdeasPage.jsx'));
const IdeaDetail = lazy(() => import('./pages/IdeaDetail.jsx'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage.jsx'));
const SolutionDetail = lazy(() => import('./pages/SolutionDetail.jsx'));
const ExpertsPage = lazy(() => import('./pages/ExpertsPage.jsx'));
const ExpertDetail = lazy(() => import('./pages/ExpertDetail.jsx'));
const FundingPage = lazy(() => import('./pages/FundingPage.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const ProjectRoom = lazy(() => import('./pages/ProjectRoom.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage.jsx'));
const LegalPage = lazy(() => import('./pages/LegalPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const ReportsPage = lazy(() => import('./pages/ReportsPage.jsx'));
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const Loading = () => <div className="container-app py-12"><Skeleton className="h-64 w-full" /></div>;

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/zglos" element={<SubmitPage />} />
          <Route path="/pomysly" element={<IdeasPage />} />
          <Route path="/pomysly/:id" element={<IdeaDetail />} />
          <Route path="/rozwiazania" element={<SolutionsPage />} />
          <Route path="/rozwiazania/:id" element={<SolutionDetail />} />
          <Route path="/eksperci" element={<ExpertsPage />} />
          <Route path="/eksperci/:id" element={<ExpertDetail />} />
          <Route path="/finansowanie" element={<FundingPage />} />
          <Route path="/projekty" element={<ProjectsPage />} />
          <Route path="/projekty/:id" element={<ProjectRoom />} />
          <Route path="/zgloszenia" element={<ReportsPage />} />
          <Route path="/zgloszenia/:id" element={<ReportsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/logowanie" element={<LoginPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/analityka" element={<AnalyticsPage />} />
          <Route path="/o-nas" element={<AboutPage />} />
          <Route path="/dostepnosc" element={<AccessibilityPage />} />
          <Route path="/prywatnosc" element={<LegalPage kind="privacy" />} />
          <Route path="/regulamin" element={<LegalPage kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}