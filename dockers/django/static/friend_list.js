import
{
	add_item,
    banner_open,
    banner_close
}
from './ft_transcendence.js';

function add_friend(value)
{
    const	div = document.createElement("div");
    let	divContainer = `
    <div class="d-flex" style="min-width: min-content;"> 
        <img class="mx-1 my-auto" height="22" src="/static/img/22/im-user-away.svg" title="Away">
        <div class="m-1 p-1 w-100" style="min-width: min-content;">
            ${value} (waiting to accept)
        </div>
    </div>`

    div.style.minWidth = "min-content";
    div.innerHTML = divContainer;
    document.querySelector("#profile-list-friend-request").appendChild(div);
}


// ------------ Fetch calls ---------------

// envoi une requete damis
// friend request
document.getElementById('friend-request-form').addEventListener('submit', function(event) {
    event.preventDefault();    
    banner_close("#profile-banner");
    const username = document.querySelector("#friend_to_add").value;

    var formData = new FormData(this);
    fetch("send_friend_request", {method: 'post', body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': '{% csrf_token %}'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            banner_open(data.error, "#profile-banner");
        } else {
            add_friend(username);
        }
    }).catch(error => {console.error('Error:', error);});
    document.querySelector("#friend_to_add").value = "";
});



// Delete un friend (friend) de la friend list
function delete_friend(friend) {
    var url = `/delete_friend`; 
    fetch(url, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify( { friend_to_delete: friend })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'élément');
        }
        
        var friend_to_delete = document.getElementById('myfriend_' + friend);
        friend_to_delete.parentNode.removeChild(friend_to_delete);
    })
    .catch(error => {
        console.error('Erreur :', error);
    });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Trouve le cookie avec le nom spécifié
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}