import
{
	add_item,
    banner_open,
    banner_close
}
from './ft_transcendence.js';

function add_friend_request_html(value, image)
{
    const	div = document.createElement("div");
    let	divContainer = `
    <div class="d-flex" style="min-width: min-content;">
        <img class="mx-1 my-auto rounded-circle" height="22" src="${image}" title="Away">
        <div class="m-1 p-1 w-100" style="min-width: min-content;">
            ${value} (waiting to accept)
        </div>
    </div>`

    div.style.minWidth = "min-content";
    div.innerHTML = divContainer;
    document.querySelector("#profile-list-friend-request").appendChild(div);
}

function add_friend_html(value, image)
{
    const	div = document.createElement("div");
    let	divContainer = `
    <div class="d-flex" style="min-width: min-content;"> 
        <img class="mx-1 my-auto rounded-circle" height="22" src="${image}" title="Away" width="22">
        <div class="m-1 p-1 w-100" style="min-width: min-content;">
            ${value}
        </div>
		<button class="border button d-flex delete m-1 rounded shadow-sm" type="submit" id="deleteButton" onclick="delete_friend('${value}',this)">
		    <img class="icon" height="22" src="/static/img/22/list-remove.svg">
		</button>
    </div>`

    div.style.minWidth = "min-content";
    div.innerHTML = divContainer;
    document.querySelector("#profile-list-friend").appendChild(div);
}


// ------------ Fetch calls ---------------

// envoi une demande damis
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
            add_friend_request_html(username, data.profile_image);
        }
    }).catch(error => {console.error('Error:', error);});
    document.querySelector("#friend_to_add").value = "";
});

// Rejette une demande damis
export function reject_friend_request(friend, button) {
    var url = `/delete_friend_request`; 
    fetch(url, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify( { friend_to_delete: friend })
    })
    .then(response => {
        if (!response.ok) {
            banner_open(data.error, "#profile-banner");
            return;
        }
        const elementToDelete = button.parentNode
        elementToDelete.parentNode.removeChild(elementToDelete);

    })
    .catch(error => {
        console.error('Erreur :', error);
    });
}

// Accepte une demande damis
export function accept_friend_request(friend, button) {
    var url = `/accept_friend_request`; 
    fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify( { friend_to_add: friend })
    })
    .then(response => {
        if (!response.ok) {
            banner_open(data.error, "#profile-banner");
            return;
        }

        const elementToDelete = button.parentNode
        elementToDelete.parentNode.removeChild(elementToDelete);
        var image = elementToDelete.children[0].src
        
        add_friend_html(friend, image);
    })
    .catch(error => {
        console.error('Erreur :', error);
    });
}

// Delete un friend (friend) de la friend list
export function delete_friend(friend, button) {
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
            banner_open(data.error, "#profile-banner");
            return;
        }
        const elementToDelete = button.parentNode
        elementToDelete.parentNode.removeChild(elementToDelete);
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