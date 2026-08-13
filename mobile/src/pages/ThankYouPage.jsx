import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Check, Instagram } from "lucide-react";
import phoneInHand from "../assets/phoneInHand.png";
import { loadConnectFlow } from "../utils/connectFlowStorage";

export default function ThankYouPage() {
	const location = useLocation();
	const flowData = location.state || loadConnectFlow() || {};

	const hasSharedContactInfo = useMemo(() => {
		const maybeValues = [
			flowData.email,
			flowData.phone,
			flowData.streetAddress,
			flowData.aptSuite,
			flowData.city,
			flowData.state,
			flowData.zipCode,
		];

		return maybeValues.some((value) => String(value || "").trim().length > 0);
	}, [flowData]);

	return (
		<div className="flex flex-col min-h-dvh bg-[#F9F9F2] px-6 pt-10 pb-8">
			<div className="mb-6">
				<p className="text-xs text-gray-400 tracking-widest uppercase mb-3">
					Visitor Check-In
				</p>
				<div className="flex gap-2">
					<div className="h-1 flex-1 rounded-full bg-green-500" />
					<div className="h-1 flex-1 rounded-full bg-green-500" />
					<div className="h-1 flex-1 rounded-full bg-green-500" />
					<div className="h-1 flex-1 rounded-full bg-green-500" />
				</div>
			</div>

			<div className="flex justify-center mb-5">
				<div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce" style={{ animationDuration: "2.6s" }}>
					<div className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center shadow-sm">
						<Check className="text-white" size={30} strokeWidth={3.2} />
					</div>
				</div>
			</div>

			<div className="mb-5 rounded-2xl overflow-hidden">
				<img
					src={phoneInHand}
					alt="Group of people smiling together"
					className="w-full h-52 object-cover"
				/>
			</div>

			<div className="text-left mb-8">
				<h1 className="text-3xl font-bold text-black leading-tight mb-4">
					Thanks for visiting us today!
				</h1>
				<p className="text-base text-black leading-relaxed">
					{hasSharedContactInfo
						? "Thank you for sharing your information. We’re grateful you joined us for worship today, and we look forward to getting to know you better — at your pace, and only in ways that serve you."
						: "We’re grateful you joined us for worship today, and we look forward to getting to know you better — at your pace, and only in ways that serve you."}
				</p>
			</div>

			<div className="mt-auto">
				<button
					type="button"
					className="w-full bg-white text-black text-lg font-semibold py-4 rounded-2xl border border-gray-200 shadow-sm"
				>
					Learn more about us
				</button>

				<a
					href="https://instagram.com/FellowshipDSM"
					target="_blank"
					rel="noreferrer"
					className="mt-5 flex items-center justify-center gap-2 text-black"
				>
					<Instagram size={18} />
					<span className="text-sm font-medium">@FellowshipDSM</span>
				</a>
			</div>
		</div>
	);
}
