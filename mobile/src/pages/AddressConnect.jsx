import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Building2,
	ChevronRight,
	Home,
	MapPin,
} from "lucide-react";
import { loadConnectFlow, saveConnectFlow } from "../utils/connectFlowStorage";

const US_STATES = [
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
];

export default function AddressConnectPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const flowData = location.state || loadConnectFlow();

	const savedAddress = useMemo(() => {
		if (!flowData) return {};
		return {
			streetAddress: flowData.streetAddress || "",
			aptSuite: flowData.aptSuite || "",
			city: flowData.city || "",
			state: flowData.state || "",
			zipCode: flowData.zipCode || "",
		};
	}, [flowData]);

	const [streetAddress, setStreetAddress] = useState(savedAddress.streetAddress || "");
	const [aptSuite, setAptSuite] = useState(savedAddress.aptSuite || "");
	const [city, setCity] = useState(savedAddress.city || "");
	const [stateCode, setStateCode] = useState(savedAddress.state || "");
	const [zipCode, setZipCode] = useState(savedAddress.zipCode || "");

	useEffect(() => {
		if (location.state) {
			saveConnectFlow(location.state);
		}
	}, [location.state]);

	useEffect(() => {
		if (!flowData) {
			navigate("/", { replace: true });
		}
	}, [flowData, navigate]);

	if (!flowData) return null;

	const handleZipChange = (e) => {
		const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
		setZipCode(digitsOnly);
	};

	const handleFinish = () => {
		const payload = {
			...flowData,
			streetAddress: streetAddress.trim(),
			aptSuite: aptSuite.trim(),
			city: city.trim(),
			state: stateCode,
			zipCode,
		};

		saveConnectFlow(payload);
		navigate("/thank-you", { replace: true, state: payload });
	};

	return (
		<div className="flex flex-col min-h-dvh bg-[#F9F9F2] px-6 pt-10 pb-6">
			<div className="mb-6">
				<p className="text-xs text-gray-400 tracking-widest uppercase mb-3">
					Visitor Check-In
				</p>
				<div className="flex gap-2">
					<div className="h-1 flex-1 rounded-full bg-green-500" />
					<div className="h-1 flex-1 rounded-full bg-green-500" />
					<div className="h-1 flex-1 rounded-full bg-green-500" />
					<div className="h-1 flex-1 rounded-full bg-gray-200" />
				</div>
			</div>

			<div className="flex justify-center mb-4">
				<div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
					<MapPin className="text-green-600" size={34} strokeWidth={2.2} />
				</div>
			</div>

			<div className="text-center mb-6">
				<h1 className="text-3xl font-bold text-black mb-2">Totally optional</h1>
				<p className="text-sm text-gray-500 leading-relaxed">
					If you’re comfortable sharing your address, we’d love to drop off a small
					plate of cookies or homemade bread as a simple ‘thank you’ for visiting.  We will only stay and chat if you ask us to
					there is no pressure at all — it’s just one of the ways we like to show that we care about you.
				</p>
			</div>

			<div className="space-y-4 flex-1">
				<div>
					<label className="block text-sm font-bold text-black mb-1.5">Street Address</label>
					<div className="relative">
						<Home
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
							size={17}
						/>
						<input
							type="text"
							value={streetAddress}
							onChange={(e) => setStreetAddress(e.target.value)}
							placeholder="123 Main Street"
							className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center gap-1.5 mb-1.5">
						<label className="text-sm font-bold text-black">Apt/Suite</label>
						<span className="text-sm text-gray-400">(Optional)</span>
					</div>
					<div className="relative">
						<Building2
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
							size={17}
						/>
						<input
							type="text"
							value={aptSuite}
							onChange={(e) => setAptSuite(e.target.value)}
							placeholder="Apt 4B"
							className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
						/>
					</div>
				</div>

				<div className="grid grid-cols-3 gap-3">
					<div className="col-span-2">
						<label className="block text-sm font-bold text-black mb-1.5">City</label>
						<input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							placeholder="City"
							className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-black mb-1.5">State</label>
						<select
							value={stateCode}
							onChange={(e) => setStateCode(e.target.value)}
							className="w-full bg-white border border-gray-300 rounded-xl px-3 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
						>
							<option value="">Select</option>
							{US_STATES.map((abbr) => (
								<option key={abbr} value={abbr}>
									{abbr}
								</option>
							))}
						</select>
					</div>
				</div>

				<div>
					<label className="block text-sm font-bold text-black mb-1.5">Zip Code</label>
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						value={zipCode}
						onChange={handleZipChange}
						placeholder="12345"
						className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
					/>
				</div>
			</div>

			<div className="mt-8">
				<button
					onClick={handleFinish}
					className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-lg font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
				>
					Finish
					<ChevronRight size={22} strokeWidth={2.5} />
				</button>
			</div>
		</div>
	);
}
