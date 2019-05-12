const plex = {
  async login(username, password) {
    console.log("try to login with " + username + " " + password);
    let form = new FormData();
    form.append("user[login]", username);
    form.append("user[password]", password);
    return fetch("https://plex.tv/users/sign_in.json", {
      method: "post",
      headers: {
        "X-Plex-Client-Identifier": "PlexWrapper",
        "X-Plex-Product": "PlxWrapper",
        "X-Plex-Version": 1
      },
      body: form
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      });
  },

  async getMovies(user, server) {
    let movies = [];
    console.log(
      "try to get movies for " + server + " " + user.authentication_token
    );
    return new Promise(async (resolve, reject) => {
      let response = await fetch(
        `https://cors-anywhere.herokuapp.com/http://${server}:32400/library/sections?X-Plex-Token=${user.authentication_token}`,
        {
          headers: {
            Accept: "application/json",
            "x-requested-with": "javascript"
          }
        }
      );

      let librariesRaw = await response.json();
      let libraries = librariesRaw.MediaContainer.Directory;
      //console.log(libraries);
      let movieLibs = libraries.filter(l => {
        return l.type === "movie";
      });

      //iterate over all movieLibs
      movieLibs.forEach(async m => {
        let movieRequest = `https://cors-anywhere.herokuapp.com/http://${server}:32400/library/sections/${m.key}/all?X-Plex-Token=${user.authentication_token}`;
        
        let response = await fetch(movieRequest, {
          headers: {
            Accept: "application/json",
            "x-requested-with": "javascript"
            }
          }
        );
        
        
        let movieRaw = await response.json();
        movieRaw.MediaContainer.Metadata.forEach(m => {
          m.poster = `http://${server}:32400${m.thumb}?X-Plex-Token=${user.authentication_token}`;
          m.duration = m.Media[0].duration;
        });
        movies.push(...movieRaw.MediaContainer.Metadata)
        
      });
      resolve(movies);
    });
  }
};

export default plex;
