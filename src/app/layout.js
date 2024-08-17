import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const font = Noto_Sans({ subsets: ["latin"] });

export const metadata = {
	title: "Pomo Timer",
	description: "A progressive pomodoro timer app.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, user-scalable=no"
				></meta>
			</Head>
			<body className={font.className}>
				<div className="top-bar">
					<h2>Pomo</h2>
				</div>
				<div className="app">{children}</div>
			</body>
		</html>
	);
}
