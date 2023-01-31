import { PostI, PostType } from "../types";
import Likes from "./Likes";
import LikesYou from "./LikesYou";
import Matches from "./matches";
import Passes from "./Passes";
import Posts from "./Posts";

interface HelpProps {
	index: number;

	userid?: string;
}

const Help = ({ index, userid }: HelpProps) => {
	if (index === 0) {
		return <Likes />;
	} else if (index === 1) {
		return <LikesYou />;
	} else if (index === 2) {
		return <Matches />;
	} else if (index === 3) {
		return <Passes />;
	} else {
		return <Posts userid={userid} />;
	}
};

export default Help;
