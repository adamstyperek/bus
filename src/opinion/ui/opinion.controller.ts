import { Body, Controller, Post } from '@nestjs/common';
import { OpinionService } from '../service/opinion.service';
import { OpinionRequestDto } from '../dto/opinion-request.dto';

@Controller('api/opinions')
export class OpinionController {
  public constructor(private service: OpinionService) {}

  @Post('open')
  public async open(@Body() body: OpinionRequestDto): Promise<any> {
    return await this.service.openOpinionBy(body.reviewerId, body.reviewerName);
  }

  @Post('finish')
  public async finish(@Body() body: OpinionRequestDto): Promise<any> {
    return await this.service.finishOpinionBy(
      body.reviewerId,
      body.reviewerName,
    );
  }
}
