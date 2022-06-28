import openfl.display.Shape;
import openfl.display.Sprite;

class Main extends Sprite {
	public function new() {
		super();
		var shape = new Shape();
		shape.graphics.beginFill(0x0000ff);
		shape.graphics.drawRect(0.0, 0.0, 250.0, 150.0);
		shape.graphics.endFill();
		shape.x = 50.0;
		shape.y = 50.0;
		addChild(shape);
		trace("Hello World");
	}
}
