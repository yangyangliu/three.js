/**
 * @author WestLangley / http://github.com/WestLangley
 */
 
import { Box3 } from '../math/Box3';
import { Line } from '../objects/Line';
import { LineBasicMaterial } from '../materials/LineBasicMaterial';
import { Float32BufferAttribute } from '../core/BufferAttribute';
import { BufferGeometry } from '../core/BufferGeometry';

function PlaneHelper( plane, size, hex ) {

	this.type = 'PlaneHelper';

	this.plane = plane;

	this.size = ( size === undefined ) ? 1 : size;

	var color = ( hex !== undefined ) ? hex : 0xffff00;

	var positions = [ 1, - 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, - 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0 ];

	var geometry = new BufferGeometry();
	geometry.addAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
	geometry.computeBoundingSphere();

	Line.call( this, geometry, new LineBasicMaterial( { color: color } ) );

	//

	var positions2 = [ 1, 1, 1, - 1, 1, 1, - 1, - 1, 1, 1, 1, 1, - 1, - 1, 1, 1, - 1, 1 ];

	var geometry2 = new BufferGeometry();
	geometry2.addAttribute( 'position', new Float32BufferAttribute( positions2, 3 ) );
	geometry2.computeBoundingSphere();

	this.add( new THREE.Mesh( geometry2, new LineBasicMaterial( { color: color, opacity: 0.2, transparent: true, depthWrite: false } ) ) );

	//

	this.onBeforeRender();

}

PlaneHelper.prototype = Object.create( Line.prototype );
PlaneHelper.prototype.constructor = PlaneHelper;

PlaneHelper.prototype.onBeforeRender = function () {

	var scale = - this.plane.constant;

	if ( Math.abs( scale ) < 1e-8 ) scale = 1e-8; // sign does not matter

	this.scale.set( 0.5 * this.size, 0.5 * this.size, scale );

	this.lookAt( this.plane.normal );

};

export { PlaneHelper };
