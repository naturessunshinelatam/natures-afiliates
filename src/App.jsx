import { useEffect, useMemo, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Landing } from "./pages/Landing";
import { fetchGeo } from "./store/geoSlice";
import { getThemeByCountry } from "./lib/themes";
import { LoadingScreen } from "./ui/LoadingScreen";
import { useImagePreload } from "./lib/useImagePreload";
import { fetchLandingContent } from "./store/contentSlice";

function App() {
  const dispatch = useDispatch();
  const { status, countryCode } = useSelector((state) => state.geo);
  const didRun = useRef(false);

  const contentState = useSelector((s) => s.content);
  useEffect(() => {}, [contentState]);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    dispatch(fetchGeo({ force: true }));
  }, [dispatch]);

  useEffect(() => {
    // cuando el pais activo cambia
    if (status === "loading") return;
    // if (status !== "ready" && status !== "error") return;
    dispatch(fetchLandingContent({ countryCode }));
  }, [dispatch, countryCode, status]);

  useEffect(() => {
    const t = getThemeByCountry(countryCode);
    const r = document.documentElement;
    r.style.setProperty("--a", t.a);
    r.style.setProperty("--b", t.b);
    r.style.setProperty("--c", t.c);
  }, [countryCode]);

  const critical = useMemo(
    () => [
      "https://powerhealth.pro/sunshineuniversity/uploads/ee46d860-f539-4b51-945f-7e3f13974156_file",
      "https://www.universidadsunshine.com/api/proxy?path=Hostinger/getImage/a1cef657-e372-4cb6-b645-c3c216fd6a64",
    ],
    [],
  );

  // const imagesReady = useImagePreload(critical);
  // const geoReady = status === "ready" || status === "error";
  // const done = geoReady && imagesReady;

  const { progress: imgProgress, ready: imagesReady } =
    useImagePreload(critical);
  const geoReady = status === "ready" || status === "error";

  const progress = Math.min(
    100,
    Math.round(imgProgress * 0.8 + (geoReady ? 100 : 0) * 0.2),
  );

  const done = geoReady && imagesReady;

  const label =
    status === "loading"
      ? `Detectando región`
      : `Cargando para ${countryCode}...`;

  return (
    <>
      <LoadingScreen done={done} progress={progress} label={label} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
