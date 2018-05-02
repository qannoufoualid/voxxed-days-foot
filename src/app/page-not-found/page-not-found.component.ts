import { Component } from '@angular/core';

/**
 * Component to be shown when the no page is found.
 */
@Component({
  moduleId: module.id,
  selector: 'story-404',
  template: `
    <article class="template animated slideInRight">
      <h4>Inconceivable!</h4>
      <div>I do not think this page is where you think it is.</div>
    </article>
  `
})
export class PageNotFoundComponent { }