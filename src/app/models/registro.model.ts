export class Registro {
  public format: string;
  public text: string;
  public type: string;
  public icon: string;
  public created: Date;
  public asistencias: string;

  constructor(format: string, text: string) {

      this.format = format;
      this.text = text;

      this.created = new Date();
      this.determinarTipo();

  }

  private determinarTipo(){

      const inicioTexto = this.text.substr( 0, 4 );
      //console.log('TIPO', inicioTexto);

      switch ( inicioTexto ) {

          case 'http':
              this.type = 'http';
              this.icon = 'globe';
          break;

          case 'doce':
              this.type = 'docente';
              this.icon = 'school-outline';
              this.asistencias = '';
          break;

          default:
              this.type = 'No reconocido';
              this.icon = 'create';

      }

  }

}

