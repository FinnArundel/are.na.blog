const arena_url = "https://www.are.na/sorrel-salb/connected-knowledge-collectors-fdqfpxpcdjm"
const section = arena_url.split("/").pop();
const api_url = `https://api.are.na/v2/channels/${section}?per=100`;

        async function getData () {
            const response = await fetch(api_url);
            const data = await response.json();
            console.log(data);

            let divBlock = [];
            let imgBlock = [];
            let textBlock = [];
            let dateBlock = [];

            let blogTitle = document.createElement("h1");
            blogTitle.setAttribute("id", "blog-title");
            document.body.appendChild(blogTitle);
            document.getElementById("blog-title").innerHTML = data.title;

            for (let i = data.contents.length-1; i > 0; i--) {
                console.log(i)

                if (data.contents[i].class === "Image" || data.contents[i].class === "Text") {

                    divBlock.push("newDiv_" + i);
                    divBlock[i] = document.createElement("h2");
                    divBlock[i].setAttribute("id", `newDiv_${i}`);
                    document.body.appendChild(divBlock[i]);
                    document.getElementById(`newDiv_${i}`).innerHTML = data.contents[i].title;

                    dateBlock.push("newDate_" + i);
                    dateBlock[i] = document.createElement("p");
                    dateBlock[i].setAttribute("id", `newDate_${i}`);
                    document.body.appendChild(dateBlock[i]);
                    let date = data.contents[i].connected_at;
                    document.getElementById(`newDate_${i}`).innerHTML = data.contents[i].connected_at.slice(0,10);

                    if (data.contents[i].class === "Image") {
                        imgBlock.push("newImg_" + i);
                        imgBlock[i] = document.createElement('img');
                        imgBlock[i].setAttribute("id", `newImg_${i}`);
                        document.body.appendChild(imgBlock[i]);
                        document.getElementById(`newImg_${i}`).src = data.contents[i].image.large.url;

                    } else if (data.contents[i].class === "Text") {

                        textBlock.push("newText_" + i);
                        textBlock[i] = document.createElement("p");
                        textBlock[i].setAttribute("id", `newText_${i}`);
                        document.body.appendChild(textBlock[i]);
                        document.getElementById(`newText_${i}`).innerHTML = marked.parse(data.contents[i].content);

                    } 
            }
        }
            
        }
        getData()
        .catch(error => {
            console.error(error);
        }) 
        .then(response => {
            console.log("done!");
        })