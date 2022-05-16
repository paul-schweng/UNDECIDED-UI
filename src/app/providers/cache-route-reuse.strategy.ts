import {DetachedRouteHandle, RouteReuseStrategy} from "@angular/router/";
import {ActivatedRouteSnapshot} from "@angular/router";


export class CustomReuseStrategy implements RouteReuseStrategy {

  handlers: {[key: string]: DetachedRouteHandle} = {};

  doNotSaveNextNavigation: boolean = false;

  clearHandlers(){
    this.handlers = {};
    this.doNotSaveNextNavigation = true;
    console.log("CLEARED CACHE")
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    //console.debug('CustomReuseStrategy:shouldDetach', route);
    if(this.doNotSaveNextNavigation){
      this.doNotSaveNextNavigation = false;
      return false;
    }
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    //console.debug('CustomReuseStrategy:store', route, handle);

    // @ts-ignore
    this.handlers[route.routeConfig.path] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    //console.debug('CustomReuseStrategy:shouldAttach', route);

    // @ts-ignore
    return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    //console.debug('CustomReuseStrategy:retrieve', route);

    console.log(this.handlers)

    // @ts-ignore
    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {

    //console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
    return future.routeConfig === curr.routeConfig;
  }

}

/*

export class CacheRouteReuseStrategy implements RouteReuseStrategy {

  storedRouteHandles = new Map<string, DetachedRouteHandle>();
  allowRetrieveCache = {
    //'results/:query': true,
    'ratings': true,
    'home': true,
    'search': true
  };

  cachedSite = 'results/:query';


  shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    /*
    if ( /*this.getPath(before) === 'detail' &&  this.getPath(curr) === this.cachedSite) {
      // @ts-ignore
      this.allowRetrieveCache[this.cachedSite] = true;
    } else {
      // @ts-ignore
      this.allowRetrieveCache[this.cachedSite] = true; //false
    }

    return before.routeConfig === curr.routeConfig;
  }


  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    console.log(route.routeConfig?.loadChildren)
    return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
  }


  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    // @ts-ignore
    if (this.allowRetrieveCache[path]) {
      return this.storedRouteHandles.has(this.getPath(route));
    }

    return false;
  }


  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetrieveCache.hasOwnProperty(path)) {
      return true;
    }
    return false;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    console.log(this.getPath(route))
    this.storedRouteHandles.set(this.getPath(route), detachedTree);
  }


  private getPath(route: ActivatedRouteSnapshot): string {
    console.log(this.storedRouteHandles)
    if (route.routeConfig?.path) {
      //console.log(route.routeConfig.path)
      return route.routeConfig.path;
    }
    return '';
  }
}

 */
