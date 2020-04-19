// Copyright 2019 Johannes Marbach
//
// This file is part of "LibrifyJS: libgen.me", hereafter referred
// to as the program.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

'use strict';

console.log('LibrifyJS: Welcome to LibrifyJS');
console.log(`LibrifyJS: Version ${browser.runtime.getManifest().version}`);

function home() {
    console.log('LibrifyJS: Locating search field');
    let searchField = document.querySelector('input');
    if (!searchField) {
        console.error('LibrifyJS: Could not locate search field');
        return;
    }
    console.log('LibrifyJS: Found search field');

    home_connectSearchField(searchField);
    home_connectCollectionLinks(searchField);
}

function home_connectSearchField(searchField) {
    console.log('LibrifyJS: Adding key-up event listener for search field');
    searchField.addEventListener('keyup', function(event) {
        console.log(`LibrifyJS: Received key ${event.keyCode} in search field`);
        if (event.keyCode !== 13) {
            console.log('LibrifyJS: Discarding key');
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        let url = LibrifyJS_LibgenMe.createSearchUrl(searchField.value, 'all', 1, 0);
        console.log(`LibrifyJS: Redirecting to ${url}`);
        document.location.href = url;
    })
    console.log('LibrifyJS: Finished adding key-up event listener for search field');
}

function home_connectCollectionLinks(searchField) {
    console.log('LibrifyJS: Adding click event listeners for collection links');
    let links = document.querySelectorAll('div.categories a.urls');
    if (!links.length) {
        console.warn('LibrifyJS: Could not locate collection links');
        return;
    }
    links[0].classList.add('active');
    for (let i = 0; i < links.length; ++i) {
        let collection = i === 0 ? 'all' : links[i].textContent.trim();
        links[i].addEventListener('click', function(event) {
            console.log(`LibrifyJS: Received click for ${collection} collection link`);
            event.preventDefault();
            event.stopImmediatePropagation();
            let url = LibrifyJS_LibgenMe.createSearchUrl(searchField.value, collection, 1, 0);
            console.log(`LibrifyJS: Redirecting to ${url}`);
            document.location.href = url;
        });
    }
    console.log('LibrifyJS: Finished adding click event listeners for collection links');
}

console.log('LibrifyJS: Running home function');
home();
console.log('LibrifyJS: Finished running home function');
