
import { Link } from "react-router-dom";
import Body from "../components/BodyComponent";


function Home() {

	return (
		<div className="bg-white">
			<Body/>
			<div className="mx-auto max-w-2xl py-32">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
					Design, Share, and Analyze Forms Like Never Before.{" "}
						<Link to="/form/create" className="font-semibold text-indigo-600">
							<span className="absolute inset-0" aria-hidden="true" />
							Create New Form <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
					Empower Your Creativity  Build Custom Forms with Ease
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
					Unlock the Power of Quizzes and Exams: Create, Customize, and Assess with Confidence. Revolutionize Learning and Evaluation Effortlessly.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							to="/form/create"
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Create New Form
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
