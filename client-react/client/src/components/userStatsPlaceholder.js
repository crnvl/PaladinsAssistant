import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export class Placeholder extends React.Component {
    render() {
        const html = `<div class="col-md">
                        <div class="card" style="width: fit-content;">
                            <img src="./assets/champions/unknown.jpg" class="card-img-top" style="height:238; width: 100%;">
                                <div class="card-body">
                                    <h5 class="card-title placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </h5>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-4"></span>
                                    </p>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-5"></span>
                                        <span class="placeholder col-7"></span>
                                    </p>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-6"></span>
                                    </p>
                                    <p class="card-text placeholder-glow">
                                        <span class="placeholder col-7"></span>
                                    </p>
                                </div>
                        </div>
                    </div>`;
        return ReactHtmlParser(html);
    }
}