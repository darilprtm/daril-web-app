"use client";

import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { Compass, MapPin, Navigation, Info, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function KiblatPage() {
    const { t, lang } = useLanguage();
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [isSupported, setIsSupported] = useState(true);

    // Kaaba Coordinates
    const KAABA_LAT = 21.422487;
    const KAABA_LNG = 39.826206;

    useEffect(() => {
        // Check if device orientation is supported
        if (!window.DeviceOrientationEvent) {
            setIsSupported(false);
            setErrorMsg("Perangkat Anda tidak mendukung sensor kompas (Device Orientation).");
        }
    }, []);

    const calcQibla = (lat: number, lng: number) => {
        // Formula to calculate Qibla direction from current lat/lng
        const phiK = KAABA_LAT * Math.PI / 180.0;
        const lambdaK = KAABA_LNG * Math.PI / 180.0;
        const phi = lat * Math.PI / 180.0;
        const lambda = lng * Math.PI / 180.0;

        const y = Math.sin(lambdaK - lambda);
        const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);

        let qibla = Math.atan2(y, x) * 180.0 / Math.PI;
        qibla = (qibla + 360.0) % 360.0;
        return qibla;
    };

    const requestPermission = async () => {
        setErrorMsg("");

        // Request Location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setLocation({ lat, lng });
                setQiblaAngle(calcQibla(lat, lng));

                // Now request DeviceOrientation
                requestDeviceOrientation();
            }, (err) => {
                setErrorMsg("Gagal mendapatkan lokasi GPS. Harap izinkan akses lokasi.");
            });
        } else {
            setErrorMsg("GPS tidak didukung di browser ini.");
        }
    };

    const requestDeviceOrientation = () => {
        // iOS 13+ requires explicit permission
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            (DeviceOrientationEvent as any).requestPermission()
                .then((permissionState: string) => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation, true);
                    } else {
                        setErrorMsg("Izin sensor kompas ditolak.");
                    }
                })
                .catch(console.error);
        } else {
            // Non-iOS 13+ devices
            window.addEventListener('deviceorientationabsolute', handleOrientation, true);
            // Fallback for devices without absolute orientation
            window.addEventListener('deviceorientation', handleOrientation, true);
        }
    };

    const handleOrientation = (event: any) => {
        let compassHeading = event.webkitCompassHeading || Math.abs(event.alpha - 360);
        if (compassHeading) {
            setHeading(compassHeading);
        }
    };

    // Calculate rotation for the compass needle based on current heading and theoretical qibla angle
    // If heading is 90 (facing East), and qibla is 290, we need to point the needle at 290 relative to North
    // Actually, simply rotating the compass dial by -heading, and placing a stationary marker at QiblaAngle works well

    return (
        <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-4xl mx-auto flex-grow w-full flex flex-col items-center">
                <div className="text-center mb-12 relative w-full">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-indigo-50 text-indigo-600 mb-6 shadow-sm">
                        <Compass className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4 text-black">Arah Kiblat</h1>
                    <p className="text-lg text-black/60 max-w-xl mx-auto">
                        Arahkan perangkat Anda ke lambang Ka'bah untuk menemukan arah solat yang tepat.
                    </p>
                </div>

                {!isSupported && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 w-full max-w-md text-center">
                        <Info className="w-6 h-6 mx-auto mb-2" />
                        {errorMsg}
                    </div>
                )}

                {isSupported && !qiblaAngle && !errorMsg && (
                    <button
                        onClick={requestPermission}
                        className="bg-black text-white px-8 py-4 rounded-3xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mb-10"
                    >
                        <MapPin className="w-5 h-5" />
                        Aktifkan Kompas & GPS
                    </button>
                )}

                {errorMsg && isSupported && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 w-full max-w-md text-center">
                        {errorMsg}
                    </div>
                )}

                {/* Compass UI */}
                {qiblaAngle && (
                    <div className="relative w-72 h-72 md:w-96 md:h-96 bg-white rounded-full shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 flex items-center justify-center mt-4">

                        {/* Static Phone Alignment Indicator (Top) */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 flex flex-col items-center">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mb-1" />
                            <Navigation className="w-6 h-6 text-indigo-600 rotate-0" />
                        </div>

                        {/* Dial that rotates to keep North up, or wait:
                           If we rotate the dial by -heading, North will be Up when heading is 0. 
                        */}
                        <div
                            className="w-full h-full rounded-full border-[10px] border-black/5 relative transition-transform duration-200 ease-out"
                            style={{ transform: `rotate(${heading ? -heading : 0}deg)` }}
                        >
                            {/* N S E W Markers inside the dial */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 font-bold text-black/40">U</div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-black/40">S</div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-black/40">T</div>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-black/40">B</div>

                            {/* Qibla Marker on the Dial */}
                            <div
                                className="absolute w-full h-full"
                                style={{ transform: `rotate(${qiblaAngle}deg)` }}
                            >
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                                    <Star className="w-4 h-4 text-white" />
                                </div>
                                {/* Line pointing middle */}
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1 h-[40%] bg-gradient-to-b from-emerald-600 to-transparent rounded-full opacity-50" />
                            </div>
                        </div>

                        {/* Center Dot */}
                        <div className="absolute w-4 h-4 bg-black rounded-full z-10 shadow-md" />
                        <div className="absolute w-2 h-2 bg-white rounded-full z-20" />
                    </div>
                )}

                {/* Debug Info */}
                {qiblaAngle && (
                    <div className="mt-12 bg-white p-6 rounded-3xl border border-black/5 shadow-sm text-center w-full max-w-sm">
                        <p className="text-3xl font-black font-serif text-emerald-600 mb-1">{qiblaAngle.toFixed(1)}°</p>
                        <p className="text-sm text-black/60 font-medium">Sudut Kiblat</p>

                        <div className="w-full h-px bg-black/5 mx-auto my-4" />

                        <div className="flex justify-around text-sm font-medium">
                            <div className="text-center">
                                <p className="text-black/40 mb-1">Heading</p>
                                <p className="text-black">{heading ? heading.toFixed(1) : '0'}°</p>
                            </div>
                            <div className="w-px h-10 bg-black/5" />
                            <div className="text-center">
                                <p className="text-black/40 mb-1">Akurasi GPS</p>
                                <p className="text-black">{location ? "Tinggi" : "-"}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
