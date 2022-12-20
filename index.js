//este codigo va al jsonplaceholder, traer todos los posts que han escrito los usuarios
//entonces trae los usuarios y los comentarios, eston ya estan escritos dentro de la pagina.
const url = "https://jsonplaceholder.typicode.com";

const getUser = async (id) => {
	const res = await fetch(`${url}/users?id=${id}`);
	const user = (await res.json())[0];

	return user;
}

const getPosts = async (user) => {
	const res = await fetch(`${url}/posts?userId=${user.id}&_limit=3`)
	const posts = await res.json();

	return posts;
}

const getCommentsForEachPost = async (posts) => {
	const res = await Promise.all(posts.map(post => 
    	fetch(`${url}/comments?postId=${post.id}&_limit=2`)  
	))
	const postComments = await Promise.all(res.map(r => r.json()));

	postComments.forEach((comments, i) => posts[i].comments = comments);
}

//render HTML

const getBlogContent = async () => {
	try {
    	const user = await getUser(1);
    	const posts = await getPosts(user);
    	await getCommentsForEachPost(posts);

		//regresar despues
    	console.log(user);
		console.log(posts);
	} catch (err) {
    	console.log(err);
	}
}

getBlogContent();