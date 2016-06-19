QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.module( "color 測試", function(assert){

  QUnit.test( "current value is smaller than previous value", function( assert ) {
    assert.equal(color(2.0,1.0),"fill:#70C1B3");
  });

  QUnit.test( "current value is bigger than previous value", function( assert ) {
    assert.equal( color(1.0,2.0), "fill:#F25F5C" );
  });

});
 
